
# TSG Website Hackathon

We have used Python based Backend Django - Framework to serve data to the website. Django is very well developed framework and has been used in reputed corporations like Instagram. Moreover, django has very friendly and vast community support.

Folder Structure:


## Folder Structure

#### App Folder and Main Project Folder


| Parameter | Description                |
| :-------- | :------------------------- |
| TSG_App   | **Required**. Your API key |
| TSG_Backend   | **Required**. Your API key |

#### TSG_App Folder

| Parameter | Description                       |
| :-------- | :-------------------------------- |
| adminViews.py | Contains all the custom APIs for custom Admin Panel|
| api.py | Contains Universal model to ensure code reusibility|
| auth.py | Contains all APIs used for authentication |
| customViews.py | Contains all the custom APIs for Student Site|
| decorators.py | Contains all the decorators which wrap the API views to ensure multiple user permissions|
| models.py | Contains definition of all the models/tables made in the database|
| serializers.py | Contains serializers which convert django queryset data to valid json|
| urls.py | Contains urls to all the APIs used in the project|
| views.py | Contains general APIs for fetching raw data in json format|


#### TSG_Backend
| Parameter | Description                       |
| :-------- | :-------------------------------- |
| settings.py | Contains all the important configurations and settings for the django project|
| urls.py | Contains base url for TSG_App urls|



## Features

- OTP login system through email
- Multi - level allowed user roles
- Activity model - stores all the actions performed on database
- JWT Authentication System
- Added pagination to REST APIs wherever data is large and  would require too much time to load

 
## Security

- All the APIs are protected using JWT Authentication
```bash
  if token is not None:
            try:
                payload = jwt.decode(token, SECRET, algorithms=[ALGO])
                print(payload["id"])
```


