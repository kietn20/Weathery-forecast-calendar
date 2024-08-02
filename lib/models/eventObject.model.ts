import mongoose, {Schema, Document, Model, models, model } from "mongoose";

export type IEventObject = {
    // id?: string, 
    title?: string,
    start?: Date | '',
    end?: Date | '', 
    addDay?: boolean,
    repeat?: string,
    tag?: string,
    description?: string
    // url?: string,
    // classNames?: string[],
    // editable?: boolean,
    // startEditable?: boolean,
    // durationEditable?: boolean, 
    // resourceEditable?: boolean,
    // extendedProps?: { tag: string }
}

const eventSchema: Schema = new Schema({
    // id: { type: String, required: true},
    title: { type: String, required: true },
    allDay: { type: Boolean, required: true},
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    repeat: {type: String, require: false},
    tag: { type: String, require: true },
    description: { type: String, require: false }

    // url: { type: String, required: true  },
    // classNames: [String],
    // editable: { type: Boolean, required: true  },
    // startEditable: { type: Boolean, required: true  },
    // durationEditable: { type: Boolean, required: true  },
    // resourceEditable: { type: Boolean, required: false  },
    // extendedProps: { type: Object, required: true }
  });

  const EventObject: Model<IEventObject> = models?.EventObject || model<IEventObject>('EventObject', eventSchema);

  export { eventSchema }