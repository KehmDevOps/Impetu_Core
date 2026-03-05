export class UserQueryTemplates {

  static findUsersByFilter(orderBy: string): string {
    return `
      SELECT 
        u.id,
        u.user_name AS userName,
        u.first_name AS firstName,
        u.last_name AS lastName,
        u.sur_name AS surName,
        u.status,
        u.created_at AS createdAt,
        r.id AS roleId,
        r.name AS roleName,
        r.description AS roleDescription,
        COUNT(*) OVER() AS total
      FROM users u
      LEFT JOIN roles r ON r.id = u.role_id
      WHERE 
        TRANSLATE(CONCAT(u.first_name, ' ', u.last_name, ' ', u.sur_name), 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') LIKE TRANSLATE(@0, 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') OR
        TRANSLATE(u.user_name, 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') LIKE TRANSLATE(@0, 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') OR
        TRANSLATE(u.last_name, 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') LIKE TRANSLATE(@0, 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') OR
        TRANSLATE(u.sur_name, 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') LIKE TRANSLATE(@0, 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') OR
        TRANSLATE(r.name, 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') LIKE TRANSLATE(@0, 'ÁÉÍÓÚáéíóú', 'aeiouaeiou')
      ORDER BY u.created_at ${orderBy}
      OFFSET @1 ROWS FETCH NEXT @2 ROWS ONLY
    `;
  }

  static findMembersByFilter(orderBy: string): string {
    return `
      SELECT
        m.id,
        m.first_name,
        m.last_name,
        m.sur_name,
        d.name,
        md.description,
        COUNT(*) OVER() AS total
      FROM members m
             LEFT JOIN membership_details md ON m.membership_details_id = md.id
             LEFT JOIN discipline d ON md.discipline_id = d.id
      WHERE TRANSLATE(CONCAT(m.first_name, ' ', m.last_name), 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') LIKE TRANSLATE(@0, 'ÁÉÍÓÚáéíóú', 'aeiouaeiou') OR
        CAST(m.id AS VARCHAR) LIKE @0 OR
        m.personal_phone LIKE @0
      ORDER BY m.id ${orderBy}
      OFFSET @1 ROWS FETCH NEXT @2 ROWS ONLY
  `;
  }
}

