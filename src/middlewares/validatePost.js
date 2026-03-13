import * as z from "zod"; 
 
const Post = z.object({ 
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(5000)
});

export const validatePost = (req, res, next) => {
  try {
    Post.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: 400,
        message: "Dados de entrada inválidos",
        errors: error.errors,
      });
    }
    next(error);
  }
};