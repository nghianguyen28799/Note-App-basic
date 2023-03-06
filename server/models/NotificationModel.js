import mongoose, { mongo } from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model("Notification", notificationSchema);
export default NotificationModel;
