export class MembersQueryTemplates {
  static getFullMemberProfile(memberId: number): string {
    return `
      SELECT
        m.id as identifier,
        m.first_name as firstName,
        m.last_name as lastName,
        m.sur_name as surName,
        m.personal_phone,
        m.emergency_phone,
        m.born_date as bornDate,
        m.address,
        p.id as parentId,
        p.description as parentDescription,
        md.name as membershipDetailsName,
        d.name as disciplineName,

        mem_gym.id as gymId,
        mem_gym_status.description as gymStatus,
        mem_gym.initial_date as gymInitialDate,
        mem_gym.end_date as gymEndDate,
        mem_gym.expired_days as gymExpiredDays,
        mem_gym.promotion_months as gymPromotionMonths,
        mem_gym.total_renews as gymTotalRenews,

        bm_box.id as boxId,
        bm_box_status.description as boxStatus,
        bm_box.intital_date as boxInitialDate,
        bm_box.end_date as boxEndDate,
        bm_box.expired_days as boxExpiredDays,
        bm_box.remaining_accesses as boxRemainingAccesses,

        (SELECT COUNT(*) FROM payments WHERE member_id = ${memberId} AND deleted_at IS NULL) as totalPayments

      FROM members m
             LEFT JOIN parents p ON p.id = m.parent_id
             LEFT JOIN membership_details md ON md.id = m.membership_details_id
             LEFT JOIN discipline d ON d.id = md.discipline_id

             LEFT JOIN (
        SELECT TOP 1 id, status, initial_date, end_date,
               expired_days, promotion_months, total_renews
        FROM membership
        WHERE member_id = ${memberId}
        ORDER BY created_at DESC
      ) mem_gym ON 1=1
             LEFT JOIN membership_status mem_gym_status ON mem_gym.status = mem_gym_status.id

             LEFT JOIN (
        SELECT TOP 1 id, membership_status_id, intital_date, end_date,
               expired_days, remaining_accesses
        FROM box_membership
        WHERE member_id = ${memberId}
        ORDER BY intital_date DESC
      ) bm_box ON 1=1
             LEFT JOIN membership_status bm_box_status ON bm_box.membership_status_id = bm_box_status.id

      WHERE m.id = ${memberId}
    `;
  }

  static getRecentPayments(memberId: number): string {
    return `
    SELECT TOP 20
      pay.id as identifier,
      pay.payment_date as paymentDate,
      pay.concept,
      pay.amount as paymentAmount,
      CASE WHEN pay.discount_coupon_id IS NOT NULL THEN 1 ELSE 0 END as coupon,
      disc.name as disciplineName,
      u.first_name as receivedByFirst,
      u.last_name as receivedByLast
    FROM payments pay
    LEFT JOIN discipline disc ON pay.discipline_id = disc.id
    LEFT JOIN users u ON pay.created_by = u.id
    WHERE pay.member_id = ${memberId} AND pay.deleted_at IS NULL
    ORDER BY pay.payment_date DESC
  `;
  }

  static findMembersByFilterWithTotal(orderBy: string): string {
    return `
    SELECT 
      m.id, m.first_name, m.last_name, m.sur_name, d.name, md.description,
      (SELECT COUNT(*) FROM members m2 
       LEFT JOIN membership_details md2 ON m2.membership_details_id = md2.id
       LEFT JOIN discipline d2 ON md2.discipline_id = d2.id
       WHERE TRANSLATE(CONCAT(m2.first_name, ' ', m2.last_name), 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') LIKE TRANSLATE(@0, 'ÁÉÍÓÚáéíóú', 'aeiouaeiou')
         OR CAST(m2.id AS VARCHAR) LIKE @0 OR m2.personal_phone LIKE @0
      ) AS total
    FROM members m WITH(NOLOCK)
    LEFT JOIN membership_details md WITH(NOLOCK) ON m.membership_details_id = md.id
    LEFT JOIN discipline d WITH(NOLOCK) ON md.discipline_id = d.id
    WHERE TRANSLATE(CONCAT(m.first_name, ' ', m.last_name), 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') LIKE TRANSLATE(@0, 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') OR
      CAST(m.id AS VARCHAR) LIKE @0 OR m.personal_phone LIKE @0
    ORDER BY m.id ${orderBy}
    OFFSET @1 ROWS FETCH NEXT @2 ROWS ONLY
  `;
  }
}