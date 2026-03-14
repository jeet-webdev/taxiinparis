// "use server";

// import { prisma } from "@/src/lib/prisma";
// // import { Prisma } from "@prisma/client";
// import { Prisma } from "@/src/generated/prisma/client";

// type PageState = {
//   success: boolean;
//   message: string;
// };

// export async function createCategoryPage(
//   categoryId: number,
//   prevState: PageState,
//   formData: FormData,
// ): Promise<PageState> {
//   try {
//     const keywords = formData.get("metaKeywords") as string;

//     const keywordArray = keywords
//       ? keywords.split(",").map((k) => k.trim())
//       : [];

//     const contentText = formData.get("content") as string;

//     await prisma.categoryPage.create({
//       data: {
//         title: formData.get("title") as string,
//         slug: formData.get("slug") as string,
//         imageUpload: formData.get("imageUpload") as string,
//         imageAlt: formData.get("imageAlt") as string,
//         metaTitle: formData.get("metaTitle") as string,
//         metaDescription: formData.get("metaDescription") as string,

//         metaKeywords: JSON.stringify(keywordArray),

//         content: contentText
//           ? ({ body: contentText } as Prisma.InputJsonValue)
//           : Prisma.JsonNull,

//         categoryId,
//       },
//     });

//     return {
//       success: true,
//       message: "Page created successfully",
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       success: false,
//       message: "Failed to create page",
//     };
//   }
// }
"use server";

import { prisma } from "@/src/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";
import { revalidatePath } from "next/cache";

type PageState = {
  success: boolean;
  message: string;
};

export async function createCategoryPage(
  categoryId: number,
  prevState: PageState,
  formData: FormData,
): Promise<PageState> {
  try {
    const keywords = formData.get("metaKeywords") as string | null;

    // Fixed syntax error: Combined the ternary logic properly
    const keywordArray = keywords
      ? keywords.split(",").map((k) => k.trim())
      : [];

    const contentText = formData.get("content") as string | null;

    await prisma.categoryPage.create({
      data: {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        imageUpload: (formData.get("imageUpload") as string) || null,
        imageAlt: (formData.get("imageAlt") as string) || null,
        metaTitle: (formData.get("metaTitle") as string) || null,
        metaDescription: (formData.get("metaDescription") as string) || null,
        metaKeywords: JSON.stringify(keywordArray),
        content: contentText
          ? ({ body: contentText } as Prisma.InputJsonValue)
          : Prisma.JsonNull,
        categoryId: Number(categoryId), // Ensure ID is a number
      },
    });

    // This forces Next.js to refresh the data on the categories page
    revalidatePath("/admin");

    return {
      success: true,
      message: "Page created successfully",
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      message: "Failed to create page",
    };
  }
}
