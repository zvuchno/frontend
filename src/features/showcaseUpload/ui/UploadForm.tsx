import { useFormContext } from "react-hook-form";
import { UploadFormValues } from "../model/types";
import { AddImageBlock } from "../components/addImageBlock/AddImageBlock";
import s from "./UploadForm.module.scss";
import { CheckboxUI, CustomInput, SelectUI } from "@/shared/ui";

export const UploadForm = ({ productType }: { productType: 'album' | 'single' | 'merch' }) => {
  const {
      register,
      formState: { errors },
      setValue,
      watch
    } = useFormContext<UploadFormValues>();
  return (
    <div>
      <AddImageBlock 
        severalImages={productType === 'merch'} 
        setValue={setValue}
      />
      <div className={s.fildsContainer}>
        <div className={s.fildsContainer__group}>
          <CustomInput 
            id='name'
            type='text'
            label='Название'
            placeholder="Текст"
            error={!!errors.name}
            message={errors.name?.message}
            inputSize="large"
            {...register('name', { required: "Название обязательно" })}
            labelClassName={s.label}
            inputClassName={s.input}
          />
          {productType === 'merch' ? (
            <CustomInput 
              id='kind'
              type='text'
              label='Тип мерча'
              inputSize="large"
              {...register('kind')}
              labelClassName={s.label}
              inputClassName={s.input}
            />
          ) : (
            <CustomInput 
              id='date'
              type='date'
              label='Дата релиза'
              inputSize="large"
              {...register('releaseDate')}
              labelClassName={s.label}
              inputClassName={s.input}
            />
          )}
          {productType === 'merch' ? (
            <SelectUI 
              label="Альбом"
              value={watch('album') ?? ''}
              onChange={(val) => setValue('album', val)}
              options={[
                { value: "1", label: "альбом 1" },
                { value: "2", label: "альбом 2" },
              ]}
              selectClassName={s.select}
              labelClassName={s.label}
            />
          ) : (
            <SelectUI 
              label="Жанр"
              value={watch('genre') ?? ''}
              onChange={(val) => setValue('genre', val)}
              options={[
                { value: "rock", label: "Рок" },
                { value: "pop", label: "Поп" },
              ]}
              selectClassName={s.select}
              labelClassName={s.label}
            />
          )}
        </div>
        <div className={s.fildsContainer__group}>
          <CustomInput 
            id='price'
            type='number'
            label='Цена'
            error={!!errors.price}
            message={errors.price?.message}
            inputSize="large"
            {...register('price', { 
              required: "Цена обязательна",
              valueAsNumber: true,
              min: { value: 0, message: 'Цена не может быть отрицательной' },
              max: 99999999,
              validate: (val) => {
                // Проверяем, что дробная часть не больше 2 знаков
                const str = String(val);
                const parts = str.split('.');
                if (parts.length > 1 && parts[1].length > 2) {
                  return 'Допускается не более 2 знаков после запятой';
                }
                return true;
              },
            })}
            labelClassName={s.label}
            inputClassName={s.input}
          />
          {productType === 'merch' ? (
            <CustomInput 
              id='quantity'
              type='number'
              label='Количество'
              inputSize="large"
              {...register('quantity')}
              labelClassName={s.label}
              inputClassName={s.input}
            />
          ) : (
            <CheckboxUI 
              type="checkbox"
              onChange={(e) => setValue('allowHigherPrice', e.target.checked)}
              checked={!!watch('allowHigherPrice')}
            >
              Разрешить фанатам платить больше если они хотят
            </CheckboxUI>
          )}
        </div>

        {productType === 'merch' && (
          <CheckboxUI 
            type="checkbox"
            onChange={(e) => setValue('allowHigherPrice', e.target.checked)}
            checked={!!watch('allowHigherPrice')}
          >
            Разрешить фанатам платить больше если они хотят
          </CheckboxUI>
        )}

        <CustomInput 
          id='description'
          label='Описание'
          multiline
          rows={5}
          placeholder="Это описание будут видеть ваши слушатели"
          style={{
            resize: 'none'
          }}
          {...register('description')}
          labelClassName={s.label}
            inputClassName={s.textarea}
        />

        <SelectUI 
          label="Приватность"
          value={watch('privacy')}
          onChange={(val) => setValue('privacy', val as 'public' | 'link_only' | 'hidden')}
          options={[
            { value: "public", label: "Для всех" },
            { value: "link_only", label: "Доступно по ссылке" },
            { value: "hidden", label: "Скрыто" },
          ]}
          selectClassName={s.select}
          labelClassName={s.label}
        />
      </div>
    </div>
  )
}