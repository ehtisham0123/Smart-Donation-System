import FileViewer from "react-file-viewer";
import { useState, useEffect } from "react";
import Spinner from "../Spinner.png";
import { useParams } from "react-router-dom";

function DetailViewer() {
  const [loading, setLoading] = useState(false);
  let { id, file, file_type } = useParams();
  return (
    <div id="content" className="mx-3">
      <div className="container">
        {loading ? (
          <div className="loading">
            <img src={Spinner} className="loader" alt="loader" />
            <h2>Loading</h2>
          </div>
        ) : (
          <div className="card">
            <div className="card-body h-100 view_file">
              <FileViewer
                fileType={file_type}
                filePath={`${process.env.React_App_Url}/uploads/${file}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailViewer;
