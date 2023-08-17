import { requireUserSession } from "./auth.server.js";
import { prisma } from "./database.server.js";
import { redirect } from "@remix-run/node";
import { getClient } from "../lib/sanity.js";
import { PurchaseStatus } from "@prisma/client";

export async function getAllCourses(excludeIds) {
  const getAllCoursesQuery = `*[_type == "course" && isOpen == true && !(_id in $excludedCourseIds)]{ 
    title, 
    "id": _id,
    slug,
    description,
    technologies[] ->{
      name,
      "id": _id
    },
  }
  `;

  const params = { excludedCourseIds: excludeIds };

  return await getClient().fetch(getAllCoursesQuery, params);
}

export async function getUserCourses(userId) {
  try {
    const enrollments = await prisma.courseEnrollment.findMany({
      where: {
        userId,
      },
      select: {
        sanityCourseId: true,
      },
    });
    const sanityCourseIds = enrollments.map(
      (purchase) => purchase.sanityCourseId
    );

    const query = `*[_type == 'course' && _id in $courseIds]{title, description, "id": _id, slug, technologies[] ->{name, "id": _id}}`;
    const params = { courseIds: sanityCourseIds };
    const courses = await getClient().fetch(query, params);

    return courses;
  } catch (error) {
    throw new Error("Failed to get courses");
  }
}

export async function isUserEnrolled(request, sanityCourseId) {
  const userId = await requireUserSession(request);
  try {
    const isEnrolled = await prisma.courseEnrollment.findFirst({
      where: {
        sanityCourseId,
        userId,
      },
    });

    return isEnrolled;
  } catch (error) {
    throw new Error("Failed to get enrollment");
  }
}

export async function enrollStudentInCourse(request) {
  const userId = await requireUserSession(request);
  const formData = await request.formData();
  const stripePaymentIntentId = formData.get("stripePaymentIntentId");
  const sanityCourseId = formData.get("sanityCourseId");

  try {
    const enrollment = await prisma.courseEnrollment.create({
      data: {
        userId,
        sanityCourseId,
        stripePaymentIntentId,
      },
    });

    return enrollment;
  } catch (error) {
    throw new Error("Failed to enroll student");
  }
}

export async function getCourseBySlug(slug) {
  const courseQuery = `*[_type == "course" && slug.current == '${slug}']{
    title,
    description,
    stars,
    price,
    "previewUrl": preview.asset->url,
    "id": _id,
    slug,
    technologies[] ->{
      name,
      "id": _id
    },
    lessons[] ->{
      title,
      "id": _id,
      "content_sum": count(contents[]),
      contents[] ->{
        title,
        "id": _id,
        slug,
      }
    }
  }[0]
  `;
  try {
    const course = await getClient().fetch(courseQuery);
    return course;
  } catch (err) {
    throw new Error("Failed to get course");
  }
}

// async function purchaseAndEnroll(
//   sanityCourseId,
//   userId,
//   pricePaid,
//   status = PurchaseStatus.SUCCESSFUL
// ) {
//   const [purchase, enrollment] = await prisma.$transaction([
//     prisma.purchase.create({
//       data: {
//         userId: userId,
//         sanityCourseId: sanityCourseId,
//         pricePaid: pricePaid,
//         status: status,
//       },
//     }),
//     prisma.courseEnrollment.create({
//       data: {
//         userId: userId,
//         sanityCourseId: sanityCourseId,
//       },
//     }),
//   ]);

//   return { purchase, enrollment };
// }

// export async function getCourseIfUserIsEnrolled(sanitycourseId, request) {
//   try {
//     const userId = await requireUserSession(request);
//     const isEnrolled = await requireEnrollment(sanitycourseId, userId);

//     if (!isEnrolled) {
//       return redirect(`/course/${courseId}`);
//     }
//     const course = await prisma.course.findFirst({
//       where: {
//         id: courseId,
//       },
//       include: {
//         lessons: {
//           include: {
//             contents: true, // contents instead of content based on the provided schema
//           },
//         },
//       },
//     });

//     if (!course) {
//       throw new Error(`Course with id ${courseId} not found.`);
//     }

//     return course;
//   } catch (error) {
//     throw new Error("Failed to get course");
//   }
// }

export async function getContentById(contentId) {

  try {
    return await prisma.content.findFirst({
      where: {
        id: contentId,
      },
    });
  } catch (error) {
    throw new Error("Failed to get content");
  }
}

// export async function updateExpense(id, expense) {
//   try {
//     return await prisma.expense.update({
//       where: {
//         id,
//       },
//       data: {
//         title: expense.title,
//         amount: +expense.amount,
//         date: new Date(expense.date),
//       },
//     });
//   } catch (error) {
//     throw new Error("Failed to update expense");
//   }
// }

// export async function deleteExpense(id) {
//   try {
//     return await prisma.expense.delete({
//       where: {
//         id,
//       },
//     });
//   } catch (error) {
//     throw new Error("Failed to delete expense");
//   }
// }
