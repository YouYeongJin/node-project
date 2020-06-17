import expressLoader from "./expressLoader";
import dbLoader from "./dbLoader";

// export default async (expressApp: any) => {
//     await expressLoader({ app: expressApp });
//     await dbLoader({ app: expressApp });
// };

const init = async ({ expressApp }: any) => {
    await expressLoader({ app: expressApp });
    await dbLoader({ app: expressApp });
};

export default { init };
