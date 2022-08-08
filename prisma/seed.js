const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

    const posts = [{
      slug: "Tango-Mike-Echo-Foxtrot-Romeo",
      title: "nunc viverra dapibus nulla suscipit ligula",
      markdown: `
  # Post #1

  > This is the greatest post of all time. -- Deepak Chopra

  - Great to read, many informations wow.
  - Such slug, very optimize engine searches
  - Many competitors, no substitute
      `.trim(),
    },
    {
      slug: "Golf-Delta-Lima-Yankee-Papa-Victor",
      title: "sollicitudin ut suscipit a feugiat et",
      markdown: `
  # Post #2

  > This is the greatest post of all time. -- Deepak Chopra

  - Great to read, many informations wow.
  - Such slug, very optimize engine searches
  - Many competitors, no substitute
      `.trim(),
    },
    {
      slug: "Echo-November-Kilo-Uniform-Oscar",
      title: "tempus vivamus in felis eu",
      markdown: `
    # Post #3

    > This is the greatest post of all time. -- Deepak Chopra

    - Great to read, many informations wow.
    - Such slug, very optimize engine searches
    - Many competitors, no substitute
      `.trim(),
    },
    {
      slug: "X-ray-Foxtrot-Tango-November-Mike",
      title: "natoque penatibus et magnis dis",
      markdown: `
    # Post #4

    > This is the greatest post of all time. -- Deepak Chopra

    - Great to read, many informations wow.
    - Such slug, very optimize engine searches
    - Many competitors, no substitute
      `.trim(),
    },
    {
      slug: "Yankee-Hotel-Foxtrot-Delta-X-ray",
      title: "sed accumsan felis ut at dolor",
      markdown: `
    # Post #5

    > This is the greatest post of all time. -- Deepak Chopra

    - Great to read, many informations wow.
    - Such slug, very optimize engine searches
    - Many competitors, no substitute
      `.trim(),
    },
    {
      slug: "my-first-post",
      title: "My First Post",
      markdown: `
    # This is my first post

    Isn't it great?
        `.trim(),
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
      markdown: `
    # 90s Mixtape

    - I wish (Skee-Lo)
    - This Is How We Do It (Montell Jordan)
    - Everlong (Foo Fighters)
    - Ms. Jackson (Outkast)
    - Interstate Love Song (Stone Temple Pilots)
    - Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)
    - Just a Friend (Biz Markie)
    - The Man Who Sold The World (Nirvana)
    - Semi-Charmed Life (Third Eye Blind)
    - ...Baby One More Time (Britney Spears)
    - Better Man (Pearl Jam)
    - It's All Coming Back to Me Now (Céline Dion)
    - This Kiss (Faith Hill)
    - Fly Away (Lenny Kravits)
    - Scar Tissue (Red Hot Chili Peppers)
    - Santa Monica (Everclear)
    - C'mon N' Ride it (Quad City DJ's)
        `.trim(),
    }];

    for (const post of posts) {
      await prisma.post.upsert({
        where: { slug: post.slug },
        create: post,
        update: post,
      });
    }

  console.log(`Databitch has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
