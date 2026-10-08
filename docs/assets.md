# Оригинальные материалы V4

- [Исходный прототип](https://kapustina-ann.github.io/volzhskie-kraski-production/): HTML и CSS сохранены в review/source-prototype.html и review/source-prototype.css. Оригинальный [logo.png](https://kapustina-ann.github.io/volzhskie-kraski-production/assets/logo.png) сохранён без изменения как assets/logo-original.png, 382×90. SHA256: aec80e539dcce2dc829fd8626581480206c1ad70d4f7001e88a7a85e8d7d6785. Вектор не найден.
- [Официальный сайт](https://volgacoatings.ru/): оригинальный favicon.ico сохранён как assets/favicon-original.ico. Логотип logo_vk.jpg сохранён в review для визуальной сверки, не подменяет исходный PNG.
- [О предприятии](https://volgacoatings.ru/company/): [фотография оборудования](https://volgacoatings.ru/DSCN2-606.JPG), assets/production-official.jpg, 1000×750. Байты оригинала сохранены. На фотографии дата 10.06.2011, подпись в интерфейсе явно архивная. Этот же исходник используется в SVG-демонстрации цвета, без изменения файла фотографии.
- [Акриловые материалы](https://volgacoatings.ru/catalog/ave/akrilovye-materialy/): оригинальная каталожная фотография assets/acrylic-catalog-official.jpg, 1500×1000, показывает AVE 2K и сопутствующие продукты. Исходный HTML сохранён в review/source-acrylic.html.
- [Алкидные материалы](https://volgacoatings.ru/catalog/ave/alkidnye-materialy/): оригинальная каталожная фотография assets/alkyd-catalog-official.jpg, 1500×855. Исходный HTML сохранён в review/source-alkyd.html.

Все восемь основных цветовых токенов direction.css совпадают с source-prototype.css. Фотографии продукции — конкретные каталожные примеры, их свойства не переносятся на всю промышленную линейку. Новые фотографии, макросъёмка и разрешённые клиентские объекты ещё требуются. Эти материалы не генерировались.

# Иллюстрации

Использован встроенный imagegen, без API-ключа и CLI. Итоговые файлы: `assets/gates.webp`, `assets/racks.webp`, `assets/forklift.webp`, `assets/machine.webp`, `assets/tractor.webp`, `assets/rail.webp`. Исходный контактный лист сохранён сервисом imagegen; в проекте находятся оптимизированные изображения. Sharp только разделил лист на панели и преобразовал их в WebP с сохранением всего объекта, без генеративных правок. Все шесть файлов вместе — менее 260 КБ.

Это иллюстрации применения, не фотографии заказчиков или завода. Логотипов третьих лиц нет. В V4 временный SVG favicon удалён: подключён оригинальный favicon официального сайта. Во второй версии изображения экспортированы квадратными 768×768, чтобы объект занимал больше места на мобильном; CSS сохраняет пропорции через object-fit: contain.

## Художественный объект второй версии

`assets/color-sculpture.webp` — оригинальная абстрактная композиция окрашенного металлического листа, созданная встроенным imagegen. Изображение 1536×1024 оптимизировано в WebP, 129 КБ. Оно не выдаётся за фотографию продукции или завода.

Промпт:

> Original premium abstract industrial color-sample sculpture for a coatings brand landing page. Landscape 1536x1024. A single monumental folded ribbon made of broad thick smooth coated metal sheet, looping into a graceful angular arch with a large circular bend and precisely cut edges. Main front surfaces bold saturated vermilion red, outer bent sheet surfaces saturated cobalt blue, uncoated back small silver edge. Sculptural assembly occupies the right 75 percent and center, close-up scale, lower edge grounded. Dramatic studio lighting from upper left makes a beautiful wide lacquer sheen, tactile smooth powder-coated surface with subtle microtexture. Entire background uniform very deep midnight navy #081b30, fading shadows, no gradients to white. Geometric sophisticated industrial artwork, design exhibition photograph of a fictional sculpture, not a documentary factory photograph. Distinct large planes and red dominant sweeping curved surface, elegant depth and negative space left. No paint splashes, no liquid, no text, no numbers, no logo, no frame, no human, no actual factory. Keep all important shapes inside canvas with 5 percent margins. This is one standalone abstract artwork asset, no web page, no UI.

## Шрифт

Manrope variable, локальный файл `assets/fonts/Manrope-variable.ttf`, 165 КБ. [Официальный источник Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope). SIL Open Font License 1.1 сохранена в `assets/fonts/OFL-Manrope.txt`. Шрифт не запрашивается с внешнего сервера во время просмотра страницы.

Промпт:

> Create one cohesive industrial art direction contact sheet for a Russian B2B coatings website, 3 columns x 2 rows, each equal rectangular panel, no gutters. Overall image 1536x1024 landscape. Each panel is an original stylized premium 3D studio illustration on the exact same deep navy background #101d35, a single recognizable industrial object centered with ample breathing space, subtle floor shadow, dramatic soft lighting, realistic materials but clearly designed illustrative miniature not documentary photograph. TOP LEFT: bold vermilion red industrial sliding steel gate with dark steel frame. TOP MIDDLE: cobalt blue warehouse shelving with red beams and a few neutral crates. TOP RIGHT: red and dark navy forklift, three quarter view. BOTTOM LEFT: cobalt blue industrial lathe machine, metal accents. BOTTOM MIDDLE: bright red agricultural tractor, dark wheels. BOTTOM RIGHT: cobalt blue railway freight wagon on a short dark track, three quarter view. Objects all equally visually weighted, each fits comfortably within own panel and never crosses panel edge, restrained elegant palette cobalt, red, silver. No typography, no labels, no brand logos, no humans, no paint cans, no watermark. This is a set of application illustrations, not images of an actual factory.
