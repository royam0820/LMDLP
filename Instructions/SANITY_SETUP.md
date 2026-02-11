# Sanity Development Environment Setup Walkthrough

## What Was Done
I have successfully set up a separate **development** environment for your Sanity content. This ensures that any changes you make locally while developing (adding fields, changing schemas, testing content) will **NOT** affect your live production website.

### Key Changes
1.  **Created Development Dataset**: A new dataset named `development` was created in your Sanity project.
2.  **Migrated Data**: All current content from your `production` dataset was copied over to the `development` dataset. You start with a mirror image of your live site.
3.  **Configured Local Environment**: Your local `.env.local` file was updated to point to this new `development` dataset.

## How to Verify
1.  **Run the App**: Start your local development server with `npm run dev`.
2.  **Check Sanity Studio**: Navigate to the Studio (usually at `/studio` or via the Studio tool if configured).
3.  **Inspect the URL/Title**: The Studio should indicate it is connected to the `development` dataset (often visible in the window title or Studio navbar).
4.  **Test a Change**: Try creating a test "Testimonial" or "Atelier".
    *   **Check Local**: It should appear in your local app.
    *   **Check Production**: Go to your live website (or the production Sanity Studio if you access it there). The test content should **NOT** be visible there.

## Important Notes on Deployment
-   **Content vs. Code**:
    -   **Content (Data)**: Content is stored in the Sanity cloud database. Your local app now talks to the `development` database. Your live site talks to the `production` database.
    -   **Code (Structure)**: When you deploy your application (e.g., to Vercel), the build process usually uses production environment variables. This means your deployed site will continue to use the `production` dataset.
-   **Schema Changes**: If you modify the *structure* of your content (e.g., add a new field to "Atelier"), you must deploy those schema changes to production for them to take effect on the live site. To do this safely, you would typically:
    1.  Test locally in `development`.
    2.  Once satisfied, you might need to migrate content or just deploy the code.
    3.  **For now, you are safe**: You can modify code locally, and it won't break the live site's content.

## Future Syncing
If the owner adds a lot of content to production and you want to update your local `development` environment effectively "refreshing" it:
1.  Run: `npx sanity dataset export production production.tar.gz`
2.  Run: `npx sanity dataset import production.tar.gz development --replace` (Be careful, this overwrites local dev data!)
