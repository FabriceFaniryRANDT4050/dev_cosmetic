# TODO List for Cosmetic Harena Fixes

## 1. Fix Article Auteur Error
- [x] Modify ArticleCrudController to make 'auteur' field not required
- [x] Set default value 'Anonyme' in persistEntity if empty

## 2. Add API Login Route
- [x] Add /api/login route in ApiController
- [x] Implement authentication logic to check email/password
- [x] Return JSON response for success or error

## 3. Separate API and Admin Routes
- [x] Add access_control for ^/api to PUBLIC_ACCESS in security.yaml

## 4. Fix Gallery Component
- [x] Change slidesToShow to 1 for both carousels in Gallery.jsx

## 5. Fix ProduitList Component
- [x] Add default description if category description is empty

## 6. Ensure Default Images
- [x] Verify all entities with images use /image/beauty.jpg as default
