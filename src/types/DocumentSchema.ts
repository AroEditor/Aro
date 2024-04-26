export default interface DocumentSchema {
  id: string;
  created_at: unknown;
  title: string | null;
  content: object | null;
  author_id: string;
  last_edited: unknown;
  shared_emails: string[];
}
