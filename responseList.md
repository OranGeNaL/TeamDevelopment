Список запросов:

- POST "/api/register" регистрация пользователя
    - Передать JSON-файл с полями: "email", "password".
    - Возвращает поле sesID - id сессии.
    - Пример: POST /api/register
    - JSON: 
    - {
        - "email" : "test123@email.ru",
        - "password": "123456789"
    - }

- GET "/api/register" валидация пользователя
    - Передать параметр sesID.
    - Возвращает поле email или 400, если пользователя не существует.
    - Пример: GET /api/register/?sesID=8c118eaa-2637-493c-a55a-28169e2711e2

- POST "/api/register/login"
    - Передать два параметра: email и password.
    - Возвращает поле sesID или 500, в случае ошибки. 
    - Пример: POST /api/register/login?email=test123@email.ru&password=12345678

- POST "/api/recipe/new" добавление нового рецепта
    - Передать JSON-файл c полями рецепта. Пример файла в группе.
    - Возращает строку вида "id":id.
    - Пример: POST /api/recipe/new
- GET "/api/recipe/{id}" получить рецепт
  - Требуется передать sesID
  - Возвращает JSON-файл рецепта
  - Пример: GET /api/recipe/1?sesID=857e5bb0-83ce-4838-ac5e-b3b7e05eb62f
- GET "/api/recipe/all" получить все рецепты
  - Возвращает все рецепты аналогично запросу выше.
  - Пример: GET /api/recipe/all
- GET "/api/recipe/author" возвращает все рецепты пользователя
  - Передать параметр email - email пользователя
  - Возвращает JSON-файл со всеми рецептами пользователя
  - Пример: GET /api/recipe/author?email=test@test.ru
- GET "/api/recipe/orderBy/date" возвращает все рецепты отсортированные по дате
  - Пример: GET /api/recipe/orderBy/date
- GET "/api/recipe/orderBy/views" возвращает все рецепты отсортированные по просмотрам
- GET "/api/recipe/orderBy/likes" возвращает все рецепты отсортированные по лайкам
- GET "/api/recipe/search" поиск по названию рецепта или категории
  - Возвращает JSON-файл со списком рецептов
  - Пример: /api/recipe/search?name=Example
  - /api/recipe/search?category=Example
- DELETE "/api/recipe/{id}" удаляет рецепт с указанным индексом
    - Пример: DELETE /api/recipe/1
- PUT "/api/recipe/{id}" заменяет рецепт
    - Передать JSON-файл с полями рецепта.
    - Пример: PUT /api/recipe/1 JSON-файл.


- POST "/api/favorites" добавить рецепт в избранное. Если рецепт уже добавлен, то при повторном запросе удаляет его
  - Передать параметры idRecipe, sesID
  - Пример: POST /api/favorites?idRecipe=1&sesID=857e5bb0-83ce-4838-ac5e-b3b7e05eb62f
- GET "/api/favorites" получить избранные рецепты пользователя.
  - Передать параметр sesID
  - Пример: GET /api/favorites?sesID=857e5bb0-83ce-4838-ac5e-b3b7e05eb62f
  - Возвращает список рецептов в виде JSON-файла

- POST "/api/like" лайк рецепта. Повторный запрос убирает лайк.
  - Передать параметры idRecipe, sesID
  - Пример: POST /api/like?idRecipe=1&sesID=857e5bb0-83ce-4838-ac5e-b3b7e05eb62f
- POST "/api/dislike" дизлайк рецепта. Повторный запрос убирает дизлайк.
  - Передать параметры idRecipe, sesID
  - Пример: POST /api/dislike?idRecipe=1&sesID=857e5bb0-83ce-4838-ac5e-b3b7e05eb62f

Рецепт содержит следующие поля:

- String name
- String category
- String description
- String mainPicture
- int cookingDuration
- int portionNumber
- List<String> directions - последовательность шагов в рецепте
- List<String> stepsPictures
- String author - передавать сессию пользователя
- int views - передавать 0
- int likes - передавать 0
- int dislikes - передавать 0
- boolean like
- boolean dislike
