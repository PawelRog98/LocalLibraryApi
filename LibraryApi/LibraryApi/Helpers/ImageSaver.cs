using LibraryApi.Helpers.Interfaces;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

namespace LibraryApi.Helpers
{
    public class ImageSaver : IImageSaver
    {
        private readonly IImageResizer _imageResizer;
        public ImageSaver(IImageResizer imageResizer)
        {
            _imageResizer = imageResizer;
        }

        public async Task<string> SaveImage(IFormFile file, string targetedFolder, string hostPath)
        {
            string folderPath = Path.Combine("Resources", targetedFolder);
            string targetedPath = Path.Combine(hostPath, folderPath);

            string newFileName = Guid.NewGuid().ToString();
            string fileName = Path.GetFileName(newFileName + "." + file.FileName.Split(".")[1].ToLower());

            string fullPath = Path.Combine(targetedPath, fileName);

            using(var fileStream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
                using(var image = Image.FromStream(fileStream))
                {
                    var resizedImage = _imageResizer.Resize(image);
                    resizedImage.Save(fileStream, ImageFormat.Jpeg);
                }
            }

            return fileName;
        }

    }
}
