CREATE OR REPLACE FUNCTION search_faq_by_keywords(
    p_keywords TEXT[]
)
RETURNS TABLE (
    faq_id INT,
    question VARCHAR,
    response VARCHAR,
    coincidences INT
)
LANGUAGE sql
STABLE
AS $$
    SELECT
        f.id,
        f.question,
        f.response,
        COUNT(*) AS coincidences
    FROM faq f
    JOIN faq_keyboard fk ON fk.idFAQ = f.id
    JOIN keyboard k ON k.id = fk.idKeyboard
    WHERE k.keyword_name ILIKE ANY (
        SELECT '%' || kw || '%' FROM unnest(p_keywords) AS kw
    )
    GROUP BY f.id, f.question, f.response
    ORDER BY coincidences DESC
    LIMIT 1;
$$;
