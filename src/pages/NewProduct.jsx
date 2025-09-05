import { useState } from 'react';
// import { addNewProduct } from '../api/firebase';
// import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      console.log(files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // 1. 제품을 cloudinary에 업로드하고 이미지 URL을 받아옴
    uploadImage(file).then((url) => {
      console.log(url);
     
    });


     // 2. Firebase에 받아온 이미지 URL과 제품 정보를 함께 저장함
  };

  return (
    <section className='w-full text-center'>
      {file && (
        <img
          className='w-96 mx-auto mb-2'
          src={URL.createObjectURL(file)}       // 브라우저에서 로컬에 있는 파일(file)을 미리보기할 수 있도록 **임시 URL(Blob URL)**을 만듬
          alt='local file'
        />
      )}
      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          name='file'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='제품명'
          required
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          placeholder='가격'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='카테고리'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='제품 설명'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='옵션들(콤마(,)로 구분)'
          required
          onChange={handleChange}
        />
        <Button type='submit' text='새 제품 등록'/>
      </form>
    </section>
  );
}
