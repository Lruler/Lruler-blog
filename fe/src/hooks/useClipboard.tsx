const useClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
}

export default useClipboard