# **Appetize You**

## **Purpose**

"Turn crisis into an opportunity."

COVID-19 has highly impacted sole proprietors. However, those with a strong conviction found or are finding a new opprotunity through the crisis.

The enhancement of the independent media industry brought a new possibility to the world.

Youna Kang, AKA CodeMiko, is a full time Twitch streamer and YouTuber who is formally a 3D designer and moved to Los Angelos in 2020 as she found a new job at the new studio. Unfortunately, COVID-19 stroke the world in 2020 and she was the one who has been laid off from the studio. With the thought of it being the last, Youna brought her skill as a formal 3D designer and technician to the independent media industry, created a virtual character named CodeMiko and has 434K subscribers on YouTube and 917K followers on Twitch.

Such flow has also opened a new pathway for the food industry. Food experts, chefs, culinary researchers, etc. are joining the battle and started to share their recipe on the media. Most of them are sharing their recipes on YouTube with written details on video description section or on comments. Those of who already have huge fan bases might have their own website or a blog, but new starters might have difficulties to afford a budget to maintain their website, etc and that is why we came up with the idea of *Appetize You*.
<br>
<br>

## **Functionality / features**

*Appetize You* promises to provide funtionalities / features like:

- **Authentication system**

Anyone can upload their recipe of any kind once they register to the site.

- **Categorizable recipe upload**

Huge food recipe websites like [Taste](https://www.taste.com.au/) and [Epicurious](https://www.epicurious.com/) are doing a fantastic job to let end users to share their recipe through the net. However, one downside of their websites is that they do not categorize recipes in depth like Western or Eastern, Cold or Hot, Dessert or Main, etc. We would like to offer the users to categorize their precious recipe in more depth so that the closest result can be exposed on top of the page.

- **Automatic ingredient quantity conversion based on the yield**

The amount of the ingredient required will be automatically calculated based on the yield.

- **Recipe review**

Users can not only upload their recipe, but also share the feedback and review the recipe.
<br>
<br>

## **Target audience**

The target audiences of *Appetize You* would be:

- food experts, chefs, culinary researchers or anyone who needs a well organized web application to share their written recipes with detailed explanation and pictures.
- those who are willing to cook a taste guaranteed delicious meal for themselves.
<br>
<br>

## **Tech stack**

### **Front-End**
- JavaScript
- ReactJS
- HTML/CSS

**JavaScript packages**
- mui
- axios
- sass
- react-confirm-alert
- react-rating-stars-component

### **Back-End**
- Ruby
- Ruby on Rails
- PostgreSQL
- AWS
- MailGun

**Ruby gems**
- bcrypt
- knock
- rack-cors
- rspec-rails
- factory_bot_rails
- aws
- jsonapi-serializer
- mail_form

### **Deployment**
- Heroku (for Back-End)
- Netlify (for Front-End)
<br>
<br>

## **Data Flow Diagram (DFD)**

![Data Flow Diagram](./docs/Data_Flow_Diagram.png)

**※ Update**

Due to the lack of resources, messaging system has been deprecated.
<br>
<br>

## **Application Architecture Diagram (AAD)**

![Application Architecture Diagram](./docs/Application_Architecture_Diagram.png)
<br>
<br>

## **User Stories**

|User|Action|Reason|
|-|-|-|
|As a generic user|I want to login to my account.|So that I could view recipes on the page.|
|As a generic user|I want to contact to the person who maintain the website.|So that I could ask admins about how the user details and recipes are handled.|
|As an author|I want to share a recipe.|So that I could show off my dish to the public.|
|As an author|I want to edit the recipes I uploaded.|So that I could correct any mistakes and enhance the description if needed.|
|As a viewer|I want to search for the recipe.|So that I could find a specific food recipe that I am looking for.|
|As a viewer|I want to rate the recipe.|So that I could explain other potential viewers how well made the recipe is.|
<br>
<br>

## **Wireframes**

<details>
<summary>Open this section to see wireframes</summary>

![Index](./docs/Index.png)


![Index tablet](./docs/Index_tablet.png)


![Recipe searching](./docs/Recipe_searching.png)


![Recipe searching tablet](./docs/Recipe_searching_tablet.png)


![Recipe detail author](./docs/Recipe_detail_author.png)


![Recipe detail viewer](./docs/Recipe_detail_viewer.png)


![Create post](./docs/Create_post.png)


![Edit post](./docs/Edit_post.png)


![Sign up](./docs/Sign_up.png)


![Sign in](./docs/Sign_in.png)


![Profile](./docs/Profile.png)


![Message box](./docs/Message_box.png)


![Contact](./docs/Contact.png)
</details>
<br>
<br>

## **Actual pages**

![Landing](./docs/FrontEnd/Landing.png)


![Login form](./docs/FrontEnd/LoginForm.png)


![Sign up form](./docs/FrontEnd/SignUpForm.png)


![Profile](./docs/FrontEnd/Profile.png)


![Recipe form](./docs/FrontEnd/RecipeForm.png)


![All recipes](./docs/FrontEnd/AllRecipes.png)


![My recipes](./docs/FrontEnd/MyRecipes.png)


![Recipe detail 01](./docs/FrontEnd/RecipeDetail01.png)


![Recipe detail 02](./docs/FrontEnd/RecipeDetail02.png)


![Recipe edit form](./docs/FrontEnd/RecipeEditForm.png)


![Contact](./docs/FrontEnd/Contact.png)
<br>
<br>

## **Trello board**

**Part 1**
![Trello](./docs/Trello.jpg)

**Part 2**
![Trello2](./docs/Trello2.png)