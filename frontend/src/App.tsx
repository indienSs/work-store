import AddJournalItem from './components/AddJournal';
import JournalTable from './components/JournalTable';
import { UpdateProvider } from './store/updateContext';

function App() {
  return (
    //@ts-ignore
    <UpdateProvider>
      <div>
        <AddJournalItem />
        <JournalTable />
      </div>
    </UpdateProvider>
  );
}

export default App;