using LibraryApi.Helpers.Interfaces;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

namespace LibraryApi.Helpers
{
    public class ImageResizer : IImageResizer
    {
        public Image Resize(Image image)
        {
            int imageWidth = image.Width;
            int imageHeight = image.Height;
            if (imageWidth <= 400)
            {
                return image;
            }
            double ratio = imageWidth / 400;
            int finalHeight = (int)(imageHeight / ratio);

            var destRect = new Rectangle(0, 0, 400, finalHeight);
            var destImage = new Bitmap(400, finalHeight);

            destImage.SetResolution(image.HorizontalResolution, image.VerticalResolution);

            using (var graphics = Graphics.FromImage(destImage))
            {

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }
            return (Image)destImage;
        }
    }
}
