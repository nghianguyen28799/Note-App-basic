import React, { useEffect, useMemo, useState } from "react";
import { ContentState, convertFromHTML, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData, useSubmit, useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_EDITOR } from "@/services/editorService";
import { UPDATE_NOTE } from "@/services/noteService";
import { debounce } from "lodash";

const Note = ({ refetchNotesList }: any) => {
  const { noteId, folderId } = useParams();

  const { data, refetch } = useQuery(GET_EDITOR, {
    variables: {
      noteId,
    },
  });
  const [updateNote] = useMutation(UPDATE_NOTE);

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  const [rawHTML, setRawHTML] = useState(data?.note.content || "");

  useEffect(() => {
    refetch({
      noteId,
    });
  }, [noteId]);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(data?.note.content || "");
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [data?.note?.id]);

  const handleOnChange = (e: any) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note) => {
      if (rawHTML === note.content) return;
      updateNote({
        variables: {
          id: note.id,
          content: rawHTML,
        },
      });
      refetchNotesList({
        folderId,
      });
    }, 500);
  }, []);

  useEffect(() => {
    debouncedMemorized(rawHTML, data?.note);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHTML]);

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something!"
    />
  );
};

export default Note;
