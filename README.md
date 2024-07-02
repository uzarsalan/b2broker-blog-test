## Getting Started

First, create `.env` file with following structure

```env
DATABASE_URL="postgresql://..."
DIRECTUS_URL="http..."
```

Then run the server:

```bash
npm start
```

CMS deployed on the address http://81.163.27.67:8055/admin

Live demo https://b2broker-blog-test.vercel.app

## Arhitectural decisions

As the framework, Next 14 with the app router was chosen.
All pages are statically generated during the project build.
The project utilizes many new features of Next and React, such as Suspense, Server components, Server actions, and useOptimistic.
Prisma was used as the ORM because it provides convenient utilities for migration, model generation, and types.

Since all site pages are statically generated, this requires implementing a page invalidation mechanism when updating from the CMS. For this, I used a webhook from the Directus CMS, which calls the `/api/revalidatePosts` route. Calling this route forcibly triggers a revalidation of the build for the main page with the list of blogs. This way, the main page always displays the most up-to-date list of posts.