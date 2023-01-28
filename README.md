# Проект: Mesto

Эта практическая работа представляет собой интерактивную страницу,
куда можно добавлять фотографии, удалять их и ставить лайки.
Основная задачи - адаптивная вёрстка, а также организация взаимодействия
с пользователем через диалоговое окно ("попап"). Организована загрузка фотографий
из контейнера при помощи JavaScript.

Сторонние данные нельзя передать свойству innerHTML, так как добавление карточек
в разметку осуществляется через template-тег.

Применена не встроенная, а "живая" валидация для всех форм.
Валидация и добавление новых фотографий организаваны с помощью классов и модулей,
согласно принципам ООП (Объектно-оринтированного программирования).

Макет дизайна страницы был взят с сайта [https://figma.com].

## Описание  

Разработка адаптивной верстки велась с использованием:
Flex-верстки;
Grid Layout;
Относительных величин. 
Файловая структура проекта организована по БЭМ, для определения
оптимальных точек перелома использовался сайт
[https://screensizemap.com],
картинки, использумые в проекте оптимизировались на сайте
[https://tinypng.com],
а сам проект доступен на GitHub Pages по ссылке:

[https://akuchevskaya.github.io/mesto/].

В проекте также есть специальный файл .nojekyll, который используется для того, чтобы GitHub корректно отображал файлы именованные по БЭМ и содержащие в своем имени нижнее подчеркивание.

Проект подключен к серверу, т.е. вся информация пользователя подгружается с сервера при помощи
GET, PATCH, POST, PUT-запросов. Добавлен счетчик лайков, а также разделение карточек на свои и других пользователей.
Свои карточки можно удалять при помощи DELETE-запросов, чужие удалять нельзя.

## Технологии:

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

### Что планируется улучшить:
пересобрать на React;
дальнейший рефакторинг.