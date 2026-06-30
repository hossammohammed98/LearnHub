export interface Conversation{
    id:string;
    userName:string;
    imgUrl:string;
    lastMessage:string;
    time:string;
    unreadCount:number;
}

export interface Message{
    id:string;
    messageText:string;
    myMessage:boolean;
    time:string;
    type?: 'text' | 'file';
    fileUrl?: string;
    fileName?: string;
    attachment?: {
        fileUrl?: string;
        fileName?: string;
        fileSize?: string;
    };
    
}

export interface UploadFileResponse{
    secureUrl:string;
    fileName:string;
}
