# Social-Network-API

## `Description`
This repository is a demonstration using [Insomnia](https://insomnia.rest/) to handle and manage large scale data that social media platforms are faced with. 
</br></br>

## `User Story`
**AS A** social media startup </br>
**I WANT** an API for my social network that uses a NoSQL database </br>
**SO THAT** my website can handle large amounts of unstructured data. </br>
</br></br>

## `Acceptance Criteria`
**GIVEN** a social network API </br>

1. **WHEN** I enter the command to invoke the application
    - **THEN** my server is started and the Mongoose models are synced to the MongoDB database.
2. **WHEN** I open API GET routes in Insomnia for users and thoughts
    - **THEN** the data for each of these routes is displayed in a formatted JSON.
3. **WHEN** I test API POST, PUT, and DELETE routes in Insomnia
    - **THEN** I am able to successfully create, update, and delete users and thoughts in my database.
4. **WHEN** I test API POST and DELETE routes in Insomnia
    - **THEN** I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list.
</br></br>

## `Mock-up`
[Mock-up Video]()
## `License`
[MIT](https://github.com/MrBrandtCox/Social-Network-API/blob/main/LICENSE)