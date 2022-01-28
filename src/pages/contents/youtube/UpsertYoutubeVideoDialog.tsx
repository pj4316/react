import { Dialog, DialogTitle } from '@mui/material';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { root } from '../../..';
import Form from '../../../components/react-hook-form/Form';
import FormButton from '../../../components/react-hook-form/FormButton';
import FormTextField from '../../../components/react-hook-form/FormTextField';
import { YoutubeVideoModel } from '../../../domain/content/youtube/model/YoutubeVideoModel';

export interface UpsertYoutubeVideoDialogProp {
  isNew: boolean;
  categoryId: string;
  initials: YoutubeVideoModel | undefined;
  onClose: () => void;
}

export const UpsertYoutubeVideoDialog = observer((props: UpsertYoutubeVideoDialogProp) => {
  const store = root.youtubeStore;
  const { isNew, onClose } = props;
  const methods = useForm<FormValues>({ defaultValues: { categoryId: props.categoryId, ...props.initials } });

  const onSubmit = async (data) => {
    await store.upsertVideo(data, data.categoryId);
    onClose();
  };

  const onError = async () => {
    alert('필수 값을 모두 입력해야 합니다');
  };

  const findVideoDetail = async () => {
    const video = await store.findVideoUsingYoutubeApi(methods.getValues('videoId'));
    methods.setValue('title', video.title);
    methods.setValue('channel', video.channel);
    methods.setValue('thumbnail', video.thumbnail);
  };

  return <Dialog
    open={true}
    onClose={onClose}
    maxWidth={'md'}
    fullWidth
  >
    <DialogTitle> 유튜브 비디오 상세 정보 </DialogTitle>
    <Form methods={methods} onSubmit={onSubmit} onError={onError}>
      <FormTextField name={'categoryId'} label={'카테고리 ID'}/>
      <FormTextField name={'videoId'} label={'비디오 ID'}/>
      <FormTextField name={'title'} label={'제목'}/>
      <FormTextField name={'channel'} label={'채널명'}/>
      <FormTextField name={'thumbnail'} label={'썸네일'}/>

      {isNew ?
        <FormButton control={methods.control} variant={'contained'} color={'success'} onClick={() => findVideoDetail()}>유튜브
          비디오 찾기</FormButton> : null}
      <FormButton control={methods.control} variant={'contained'} color={'success'}
                  type={'submit'}>{isNew ? '추가' : '수정'}</FormButton>
      <FormButton control={methods.control} variant={'contained'} color={'error'}
                  onClick={onClose}>닫기</FormButton>
    </Form>
  </Dialog>;
});

type FormValues = {
  categoryId: string,
  id: string,
  videoId: string,
  channel: string,
  thumbnail: string,
  title: string,
}
