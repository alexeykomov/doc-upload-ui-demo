import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,
  },
  header: {
    color: 'rgb(141,175,192)',
    fontSize: '16px',
    fontWeight: 'bold',
    paddingTop: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  mainContainer: {
    flexDirection: 'row',
    display: 'flex',
    height: '100%',
    width: '100%',

    position: 'absolute',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  readingContainer: {
    position: 'absolute',
    backgroundColor: 'rgb(233,239,246)',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
    height: 'calc(100% - 56px)',
    width: '100%',
    marginTop: '56px',
  },
  readingContainerScreenIsWide: {
    position: 'static',
    height: '100%',
    marginTop: '0',
  },
  listContainer: {
    maxWidth: '320px',
    backgroundColor: '#fff',
  },
  listItemSelected: {
    backgroundColor: 'rgb(233,239,246)',
  },
  itemText: {
    color: 'rgb(121,120,121)',
  },
  pageView: {
    width: '80%',
    maxWidth: '600px',
    cursor: 'grab',
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
  },
  uploadForm: {
    position: 'absolute',
    visibility: 'hidden',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});
