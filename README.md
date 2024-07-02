# Домашнее задание ШРИ: Автотесты

## Легенда

**[<file-name>]** - отображение файла, в котором тестируется данная функциональность

Пример: **[unit/ProductItem.test.ts]**

В папке mock лежат вспомогательные файлы для тестов


## Функциональные требования

**Общие требования:**
- вёрстка должна адаптироваться под ширину экрана
- ✔️ **[unit/page/Application.test.ts]** в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину
- ✔️ **[unit/page/Application.test.ts]** название магазина в шапке должно быть ссылкой на главную страницу
- ✔️ **[unit/page/Application.test.ts]** на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"
- ✔️ **[unit/page/Application.test.ts]** при выборе элемента из меню "гамбургера", меню должно закрываться

**Страницы:**
- в магазине должны быть страницы: главная, каталог, условия доставки, контакты
- ✔️ **[unit/page/(Home|Contacts|Delivery).test.ts]** страницы главная, условия доставки, контакты должны иметь статическое содержимое

**Каталог:**
- ✔️ **[unit/page/Catalog.test.ts]** в каталоге должны отображаться товары, список которых приходит с сервера
- ✔️ **[unit/component/ProductItem.test.ts]** для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре
- ✔️ **[unit/component/ProductDetails.test.ts]** на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"
- если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом
- если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество
- содержимое корзины должно сохраняться между перезагрузками страницы

**Корзина:**
- в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней
- в корзине должна отображаться таблица с добавленными в нее товарами
- для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа
- в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться
- ✔️ **[unit/page/Cart]** если корзина пустая, должна отображаться ссылка на каталог товаров

## Дополнительно проверенный фунционал

**Корзина:**
- ✔️ **[unit/page/Cart]** когда пустая корзина, отображается текст о пустоте

**Каталог:**
- ✔️ **[unit/page/Catalog]** отображается лоадер во время прогрузки товаров

**Продукт:**
- ✔️ **[unit/page/Product]** отображается продукт после получения с сервера

## Как проверять

Вы можете запускать приложение с параметром `bug id`, который может принимать значение от 1 до 10. Каждое из значений `bug id` добавляет в работу приложения какой-то баг. Проверьте, что без параметра `bug id` все тесты проходят, а для каждого значения `bug id` падают 1-2 теста.

Как передать `bug id`:
- при запуске интеграционных тестов передавайте значение в параметре запроса, например, http://localhost:3000/hw/store/catalog/0?bug_id=9
- при запуске модульных тестов передавайте значение в переменной окружения `BUG_ID`, например, `BUG_ID=1 npm run test`
