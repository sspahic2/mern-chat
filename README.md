# mern-chat

Here is the link to the frontend page: [link](https://mern-chat-yeul.vercel.app)
Here you can find the backend api: [link](https://mern-chat-api-jq69.onrender.com)

**For the frontend side of things:**
1. Vite was used to create the project
2. React was used to create the website
3. ChakraUI was used as a CSS framework


**Backend magic:**
1. Node + express were used to create api endpoints
2. For realtime information sharing, socket.io was used
3. Supabase was used basically as an ORM here and the DB is in Postgresql

**Running locally:**

To run the application locally you need to call run commands for backend and frontend.

Backend: cd backend into the backend folder and then run npm run dev

Frontend: cd frontend into the frontend folder and then run npm run dev

**The maind idea:**

Everything was made so it could be replaced with as little changes as needed. 
If you need to use a different encryption library/jwt generateor/database orm/database structure, then that will require minimal changes.
Same goes for the frontend. Hooks were actively used and reused in different components/pages and that brought down the complexity of implementation.

**Backend architecture:**

We have here the classic onion architecture.

It goes like this: **route -> controller -> manager -> service -> repository -> database**

The manager layer is there so that most library commands don't have to be run in the service layer, or the controller layer.
Each layer has their own purpose.
1. The repository layer is there to be the only entrance into the database. Here we also do the mapping from the database to models that are used in the backend.
2. Service layer is there to combine multiple repository calls into one access point and return them to the manager.
3. The manager layer combines the service calls with some libraries, like for instance jwt, and bubbles them up to the controller layer.
4. Controllers are there to specify different routes of a given router and to catch some unhandled errors.
5. Finally the routers are the ones that call different controllers and controller functions based on the request.
6. In between the factories are there to create data structures based on a give input.
7. Error logging was implemented as a console.log, but it was implemented so that in the future if it needs to be implemented, then only one file needs to be edited.

On top of that we have socket.io. All the socket connections are inside the index.ts file.

Throughut the backend and frontend error handling was implemented.

**Frontend architecture:**
1. All the routes are handled inside the App.tsx file, using router-dom.
2. The pages folder holds the different pages that the user has access to (chat/login/register). While the components folder holds the components that are used inside the different pages.
3. Two contexts were implemented. One for the user and the other one for the socket connection. This allows the developer to access them at any point inside of the application.
4. Different hooks were used so that no request implementation or state management is tied to a component/page.
5. The services folder holds all the different possible requests that can be sent to the backend.
6. There exists the HttpService through which all API request go. In the future in there logging or some specific headers can be added.

The given messages and chats that are being loaded, have each a component that indicates elegantly that the request is pending.

**Some things that would have been good to add, but with the given timefreame were not possible:**
1. Adding and leaving an existing chat.
2. Indicating which user sent a message if there are multiple users in chat.
3. Protecting API routes. This was done quickly with CORS by restricting the origin to the frontend URL. Nevertheless it would have been a good idea to add middleware to all /api requests.
4. Docker for more smooth developer experience.
