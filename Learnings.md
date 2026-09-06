date 28-08-2026

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >

1. we get laayout.tsx file intoapp folder :hota ye hai ki ye header aur footer joki kabhi nahi badlega usko ye yaha rakhta ahi for consistant layout of the home page: it`s very similar what we does using {outlet} into react under app.jsx file,main.jsx is used to hold the routing setup of hte whole project
   > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >
2. date 29/08/2026
3. on main page or home page,i want to show Brand,Catrgory,featured Products so for all of to show concept is ""create these UI components and import them into app/page.tsx " don`t make seprate folder like app/Banner/page.jsx becusae it will create a router for banner which we don`t require
   its very similar as we do into react myntra project we put all the home page conntents under home.jsx <Banner/> <Category/><Feaured>
   > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > date 03-09-2026
4. to show any image on UI we don`t use <img/> tag which is from react ,we have dedicated <Image/> which we get by importing from next/Image
5. who can be cleint compo ==>for any type of event listner its container compo should be cleint not server,because we can`t attach onClick to server compo
   > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >
6. For Navigation inot Next js we use Link it can also send the url info to the server once any nav link is clicked
   .................................................................................................
   Date 04-09-2026
7. today i am going to connect my Db with this next js project
8. Next js don`t need express it has it`s built in tool for routing and middleware handling setup,in MERN stack we handle 2 application becasue backedn needs seprate framwork (express.js) into NExt js both services can run on same system
9. in Next.js we don`t need to import the env file ,it natively loads that for us
   > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > date 05-09-2026
10.
