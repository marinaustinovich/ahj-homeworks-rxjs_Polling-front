[![Build status](https://ci.appveyor.com/api/projects/status/st3co421buoack03/branch/main?svg=true)](https://ci.appveyor.com/project/marinaustinovich/ahj-homeworks-rxjs-polling-front/branch/main)

deployment: https://marinaustinovich.github.io/ahj-homeworks-rxjs_Polling-front/

## Polling

### Легенда

Корпоративная система, в рамках которой есть система обмена сообщениями, аналогичная email. Реализован периодический опрос сервера о поступлении новых сообщений. Поскольку для работы в организации используестя RxJS, то сделано это нужно с его помощью.

#### Клиентская часть

На клиенте с помощью RxJS реализован виджет, подписывающийся на обновления. При получении обновлений они добавляются в таблицу сообщений:

![](./src/img/polling.png)


Сообщения добавляются именно сверху, предыдущие не удаляются.

Для получения данных через определённые промежутки используется оператор `interval`.

Для запросов используется [AJAX](https://rxjs-dev.firebaseapp.com/api/ajax/ajax):
```javascript
import { ajax } from 'rxjs/ajax';

ajax.getJSON(<url>);
```

1. Сообщения лежат в свойстве `messages`.
2. При отображении сокращается `subject` до 15 символов. Если длина больше, то последнее название сокращается до 15 символов и дополняется символом многоточия.
3. Дата при отображении переводится из timestamp в формат ЧЧ:ММ ДД.ММ.ГГГГ.

При получении ошибки — сервер недоступен либо код ответа не 200 — преобразовывается ошибка так, чтобы это было аналогично отсутствию новых сообщений.