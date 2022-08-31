using System.Drawing;

namespace LibraryApi.Helpers.Interfaces
{
    public interface IImageResizer
    {
        Image Resize(Image image);
    }
}
