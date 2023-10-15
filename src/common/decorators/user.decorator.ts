import { ExecutionContext, createParamDecorator } from "@nestjs/common"

// custom decorator
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
)