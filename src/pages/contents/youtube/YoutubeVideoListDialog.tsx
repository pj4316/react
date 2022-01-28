import { Button, Dialog, DialogActions, DialogContent, DialogTitle, styled } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { root } from '../../..';
import { YoutubeCategoryModel } from '../../../domain/content/youtube/model/YoutubeCategoryModel';
import { YoutubeVideoModel } from '../../../domain/content/youtube/model/YoutubeVideoModel';
import { UpsertYoutubeVideoDialog } from './UpsertYoutubeVideoDialog';

const columns: GridColDef[] = [
  {
    field: 'title', headerName: '비디오 제목', width: 580, valueGetter: (param) => {
      return param.row.title;
    },
  },
  { field: 'channel', headerName: '채널명', width: 240 },
];

interface YoutubeVideoListDialogProp {
  category: YoutubeCategoryModel | undefined,
  onClose: () => void
}

export const YoutubeVideoListDialog = observer((props: YoutubeVideoListDialogProp) => {
  const { onClose, category } = props;
  const store = root.youtubeStore;

  useEffect(() => {
    if (category !== undefined)
      store.findAllVideos(category.id);
  }, []);
  const [openUpsertDialog, setOpenUpsertDialog] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<YoutubeVideoModel>();
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [isNew, setIsNew] = useState<boolean>(false);

  const closeDialog = () => {
    setOpenUpsertDialog(false);
    setSelectedRow(undefined);
    setIsNew(false);
  };

  const update = () => {
    const selectedVideo = store.findVideoById(selectedRowIds[0]);

    if (selectedVideo === undefined) return;
    setOpenUpsertDialog(true);
    setSelectedRow(selectedVideo);
    setIsNew(false);
  };

  const create = () => {
    setOpenUpsertDialog(true);
    setSelectedRow({} as YoutubeVideoModel);
    setIsNew(true);
  };

  const remove = (ids: string[], categoryId: string) => {
    store.removeVideos(ids, categoryId);
  };

  return category !== undefined ? <Dialog
    open={true}
    maxWidth={'md'}
    onClose={onClose}
    fullWidth
  >
    <DialogTitle> 유튜브 추천 카테고리 비디오 목록 관리 </DialogTitle>
    <MaxDialogContent sx={{ height: '600px' }}>
      <DataGrid
        checkboxSelection
        rows={toJS(store.videos)}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        hideFooterSelectedRowCount
        onSelectionModelChange={(selectionModel) => setSelectedRowIds(selectionModel as string[])}
      />
    </MaxDialogContent>
    <DialogActions>
      {selectedRowIds.length === 1 ?
        <Button variant={'contained'} color={'success'} onClick={() => update()}>수정</Button> : null}
      {selectedRowIds.length > 0 ? <Button variant={'contained'} color={'error'} onClick={() => {
        remove(selectedRowIds, category.id);
      }}>제거</Button> : null}
      <Button variant={'contained'} color={'success'} onClick={() => create()}>추가</Button>
      <Button variant={'contained'} color={'error'} onClick={() => onClose()}>닫기</Button>
    </DialogActions>
    {openUpsertDialog
      ? <UpsertYoutubeVideoDialog
        isNew={isNew}
        categoryId={category.id}
        initials={selectedRow}
        onClose={closeDialog}/>
      : null}
  </Dialog> : null;
});

const MaxDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: 16,
  borderRadius: 16,
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  gap: 8,
}));
