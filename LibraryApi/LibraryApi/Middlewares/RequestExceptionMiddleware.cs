using LibraryApi.Exceptions;

namespace LibraryApi.Middlewares
{
    public class RequestExceptionMiddleware : IMiddleware
    {
        public readonly ILogger<RequestExceptionMiddleware> _logger;
        public RequestExceptionMiddleware(ILogger<RequestExceptionMiddleware> logger)
        {
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate request)
        {
            try
            {
                await request.Invoke(context);
            }
            catch(BadRequestException badRequestException)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(badRequestException.Message);
            }
            catch(UnauthorizedRequestException unauthorizedRequestException)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync(unauthorizedRequestException.Message);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Oooops, something went wrong :(");
            }
        }
    }
}
