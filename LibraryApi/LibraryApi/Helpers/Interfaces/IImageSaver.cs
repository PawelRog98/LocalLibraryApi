using System.Drawing;

namespace LibraryApi.Helpers.Interfaces
{
    public interface IImageSaver
    {
        Task<string> SaveImage(IFormFile file, string targetedFolder, string hostPath);
    }
}
