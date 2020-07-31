const breads = [
  {
    tags  : ["intro"],
    slides: [
      {
        title: "Hello",
        contents: [
          {type: "text", content: "This is a content."},
          {type: "text", content: "This is another content."},
          {type: "text", content: "Click this card, and then press the right arrow to see the next of my story."}
        ]
      },
      {
        title: "I like orange",
        contents: [
          {type: "text", content: "Orange is sweet."},
          {type: "text", content: "and also orange is orange."},
          {type: "text", content: "Press the left arrow to go bact to the previous content."},
          {type: "text", content: "You can click another card, and the press left or right arrow to see the card content."}
        ]
      },
      {
        title: "See you on GitHub",
        contents: [
          {type: "text", content: "You can see me on GitHub. See you there..."},
          {type: "homepage", url: "https://twitter.com/daimessdn"},
        ]
      }
    ],
  },
  {
    tags  : ["story"],
    slides: [
      {
        title: "Story about a duck",
        contents: [
          {type: "text", content: "Once upon a time, there was a duck swimming around the river. Suddenly, he met his friend."},
          {type: "text", content: "He asked his friend to swim together and his friend agreed."}
        ]
      },
      {
        title: "",
        contents: [
          {type: "text", content: "Finally, they swam together."},
          {type: "image", content: {
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGDqyt_-PDDNCBbaURYMUI9h4MrEhwHUHygA&usqp=CAU",
            alt: "duck swimming"
          }}
        ]
      }
    ],
  },
  {
    tags  : ["code", "javascript"],
    slides: [
      {
        title: "How to print first 5 numbers in JS",
        contents: [
          {type: "text", content: "1. Type the for loop:"},
          {type: "code", lang: "javascript", content: "for (let i = 1; i <= 5; i++) {\n\n}"}
        ]
      },
      {
        title: "",
        contents: [
          {type: "text", content: "2. Let's apply <code>console.log()</code> inside the loop:"},
          {type: "code", lang: "javascript", content: "for (let i = 1; i <= 5; i++) {\n\ \ console.log(i);\n}"}
        ]
      },
      {
        title: "",
        contents: [
          {type: "text", content: "3. Yay! We did it!!!"},
          {type: "code", lang: "javascript", content: "1\n2\n3\n4\n5"}
        ]
      }
    ],
  },
  {
    tags  : ["nodejs", "mongodb"],
    slides: [
      {
        title: "Using MongoDB in Node.js (part 1)",
        contents: [
          {type: "text", content: "In this time, we will learn how to use MongoDB in Node.js"}
        ]
      },
      {
        title: "Installing <code>mongodb</code> module",
        contents: [
          {type: "text", content: "Let's open <em>Terminal</em> on Linux (or <em>Command Prompt</em> on Windows. Create the <code>npm</code> project and install <code>mongodb</code> package."},
          {type: "code", lang: "bash", content: "mkdir nodejs-mongodb\ncd nodejs-mongodb\nnpm init --yes"},
          {type: "text", content: "After creating <code>npm</code> project,"},
          {type: "code", lang: "bash", content: "npm install mongodb"}
        ]
      },
      {
        title: "Initiated JavaScript config",
        contents: [
          {type: "text", content: "Create the empty <code>app.js</code> file and import <code>mongodb</code> module."},
          {type: "code", content: "const mongo = require('mongodb').MongoClient;"},
          {type: "text", content: "Still in <code>app.js</code>, add the MongoDB localhost variable"},
          {type: "code", lang: "javascript", content: "const mongo = require('mongodb').MongoClient;\n\nconst url = 'mongodb://localhost:27017'"}
        ]
      },
    ],
  },
];