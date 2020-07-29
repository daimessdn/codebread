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
          {type: "text", content: "Press the left arrow to go bact to the previous content."}
          {type: "text", content: "You can click another card, and the press left or right arrow to see the card content."}
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
          {type: "code", content: "for (let i = 1; i <= 5; i++) {\n\n}"}
        ]
      },
      {
        title: "",
        contents: [
          {type: "text", content: "2. Let's apply <code>console.log()</code> inside the loop:"},
          {type: "code", content: "for (let i = 1; i <= 5; i++) {\n\ \ console.log(i);\n}"}
        ]
      },
      {
        title: "",
        contents: [
          {type: "text", content: "3. Yay! We did it!!!"},
          {type: "code", content: "1\n2\n3\n4\n5"}
        ]
      }
    ],
  },
];