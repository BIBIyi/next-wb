// eslint-disable-next-line import/no-anonymous-default-export
export type LoginUser = {
  data: {
    token: string;
    role: string;
    userId: number;
  };
};
export default async (req: any, res: any) => {
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};
