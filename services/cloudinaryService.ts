
/**
 * Cloudinary Frontend Delivery Service
 * Sử dụng tính năng "Resource Listing" (Tag-based) để hiển thị ảnh.
 */

const CLOUD_NAME = 'dadfqpexa';
const TAG_NAME = 'maichi'; 

export const getCloudinaryUrl = (publicId: string, options: { width?: number; height?: number; crop?: string } = {}) => {
  if (!publicId) return '';
  if (publicId.startsWith('http')) return publicId;

  const { width, height, crop = 'fill' } = options;
  
  const transformations = [
    'f_auto',
    'q_auto',
    width ? `w_${width}` : '',
    height ? `h_${height}` : '',
    width || height ? `c_${crop}` : '',
  ].filter(Boolean).join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
};

export const fetchImagesFromCloudinary = async () => {
  try {
    const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${TAG_NAME}.json`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Tag "${TAG_NAME}" chưa có ảnh nào. Vui lòng gắn tag trên Cloudinary.`);
      }
      throw new Error('Cấu hình Cloudinary chưa đúng (Resource List bị chặn hoặc sai Cloud Name).');
    }

    const data = await response.json();
    
    return data.resources.map((res: any) => ({
      id: res.public_id,
      url: res.public_id,
      title: 'Khoảnh khắc yêu thương',
      artist: 'Mai Chi',
      category: 'Kỷ Niệm',
      width: res.width || 1200,
      height: res.height || 800,
      cloudinaryData: {
        public_id: res.public_id,
        format: res.format
      }
    }));
  } catch (error: any) {
    console.error('Cloudinary Error:', error);
    throw error;
  }
};
