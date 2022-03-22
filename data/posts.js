import { USERS } from "./users";

export const POSTS = [
  {
    imageUrl: "https://i.ibb.co/182bP1y/4k.png",
    user: USERS[0].user,
    likes: 19723,
    caption:
      "Building the Netflix clone with React js 🚀. This is going to be fun building. #reactjs #justDoIt ",
    profile_picture: USERS[0].image,
    comments: [
      {
        user: "theQazman",
        comment: "WoW! This build looks fire. Super excited to complete it",
      },
      {
        user: "amanat.dev",
        comment: "Once I wake Up, I'll finally be ready to code this up",
      },
    ],
  },
  {
    imageUrl:
      "https://www.thoughtco.com/thmb/H38gRdT4mr7tUlGup-AAptDUZnw=/3804x3804/smart/filters:no_upscale()/male-computer-programmer-using-laptop-at-desk-in-office-755650739-5c5bb32346e0fb0001f24d3d.jpg",
    user: USERS[1].user,
    likes: 18276,
    caption: "Having Fun in Kolkata",
    profile_picture: USERS[1].image,
    comments: [
      {
        user: "clever qazi",
        comment: "Wollaaaaaaaaaaaaaahhhhh",
      },
      {
        user: "amanat.dev",
        comment: "I AM Sleeping",
      },
    ],
  },
];
