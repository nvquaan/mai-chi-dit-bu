
/**
 * Cloudinary Frontend Service
 * Sử dụng tính năng "Resource Listing" để lấy ảnh theo Tag.
 * Yêu cầu: Bỏ chọn "Resource list" trong Cloudinary Settings > Security.
 */

const CLOUD_NAME = 'dadfqpexa';
const TAG_NAME = 'maichi'; // Bạn cần gắn tag 'maichi' cho các ảnh trên Cloudinary

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
    // API lấy danh sách ảnh theo tag của Cloudinary (không cần Secret)
    const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${TAG_NAME}.json`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Không tìm thấy tag "${TAG_NAME}". Hãy đảm bảo bạn đã gắn tag này cho ít nhất 1 ảnh.`);
      }
      throw new Error('Lỗi cấu hình Cloudinary: Hãy kiểm tra xem bạn đã bỏ chọn "Resource list" trong Settings > Security chưa.');
    }

    const data = await response.json();
    
    if (!data.resources || data.resources.length === 0) {
      return [];
    }

    return data.resources.map((res: any) => ({
      id: res.public_id,
      url: res.public_id,
      title: 'Khoảnh khắc yêu thương',
      artist: 'Mai Chi',
      category: 'Kỷ Niệm',
      width: res.width || 800,
      height: res.height || 600,
      cloudinaryData: {
        public_id: res.public_id,
        format: res.format
      }
    }));
  } catch (error: any) {
    console.error('Fetch Images Error:', error);
    throw error;
  }
};
