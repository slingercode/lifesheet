-- Delete data
DELETE FROM DB WHERE id IN (1, 2, ...);

-- Update capture date (useful when is to late)
UPDATE DB SET timestamp = timestamp - interval '3 hour' WHERE id IN (1, 2, ...);