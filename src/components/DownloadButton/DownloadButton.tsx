import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

export const DownloadButton = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  const handleDownload = () => {
    const csvContent = selectedItems
      .map(
        (item) =>
          `${item.name},${item.birth_year},${item.gender},${item.height},${item.mass}`
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = `${selectedItems.length}_items.csv`;

      linkRef.current.click();
    }

    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <button onClick={handleDownload}>Download</button>
      <a ref={linkRef} style={{ display: 'none' }} />
    </>
  );
};
