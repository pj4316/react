import { Dialog, DialogTitle } from '@mui/material';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { root } from '../../..';
import Form from '../../../components/react-hook-form/Form';
import FormButton from '../../../components/react-hook-form/FormButton';
import FormCheckbox from '../../../components/react-hook-form/FormCheckbox';
import FormNumber from '../../../components/react-hook-form/FormNumber';
import FormSelect from '../../../components/react-hook-form/FormSelect';
import FormTextField from '../../../components/react-hook-form/FormTextField';
import { RegionType } from '../../../domain/content/youtube/model/RegionType';
import { YoutubeCategoryModel } from '../../../domain/content/youtube/model/YoutubeCategoryModel';

export interface UpsertYoutubeCategoryDialogProp {
  isNew: boolean;
  initials: YoutubeCategoryModel | undefined;
  onClose: () => void;
}

export const UpsertYoutubeCategoryDialog = observer((props: UpsertYoutubeCategoryDialogProp) => {
  const store = root.youtubeStore;
  const { isNew } = props;
  const methods = useForm<FormValues>({ defaultValues: props.initials });

  const onSubmit = async (data) => {
    await store.upsertCategory(new YoutubeCategoryModel(data));
    props.onClose();
  };

  const onError = async () => {
    alert('필수 값을 모두 입력해야 합니다');
  };

  return <Dialog
    open={true}
    onClose={() => props.onClose()}
    maxWidth={'md'}
    fullWidth
  >
    <DialogTitle> 유튜브 카테고리 상세 정보 </DialogTitle>
    <Form methods={methods} onSubmit={onSubmit} onError={onError}>
      <FormSelect name={'regionType'} label={'노출 국가'}
                  options={Object.values(RegionType)} rules={{ required: true }}/>
      <FormTextField name={'id'} label={'카테고리 ID'} rules={{ required: true }}/>
      <FormTextField name={'icon'} label={'아이콘'} rules={{ required: true }}/>
      <FormNumber name={'index'} label={'순서'} rules={{ required: true }}/>
      <FormTextField name={'name'} label={'카테고리명'} rules={{ required: true }}/>
      <FormCheckbox name={'show'} label={'활성화'}/>
      <FormNumber name={'count'} label={'카운트'}/>
      <FormTextField
        name={'color'}
        label={'배경색'}
        rules={{
          required: true,
          pattern: {
            value: /^#(?:[0-9a-f]{3}){1,2}$/i,
            message: '#FFFFFF 컬러 포멧으로 입력하세요.',
          },
        }}/>
      <FormButton control={methods.control} variant={'contained'} color={'success'}
                  type={'submit'}>{isNew ? '추가' : '수정'}</FormButton>
      <FormButton control={methods.control} variant={'contained'} color={'error'}
                  onClick={() => props.onClose()}>닫기</FormButton>
    </Form>
  </Dialog>;
});

type FormValues = {
  key: string;
  regionType: RegionType;
  id: string;
  icon: string;
  index: number;
  name: string;
  show: boolean;
  count: number;
  color: string;
}
