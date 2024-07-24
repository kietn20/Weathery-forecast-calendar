import mongoose, {Schema, Document, Model, models, model } from "mongoose";

export type IEventObject = {
    id?: string, 
    title?: string,
    addDay?: boolean,
    start?: Date,
    end?: Date, 
    url?: string,
    classNames?: string[],
    editable?: boolean,
    startEditable?: boolean,
    durationEditable?: boolean, 
    resourceEditable?: boolean,
    extendedProps?: { tag: string }
}

const eventObjectSchema: Schema = new Schema({
    id: { type: String, required: true},
    title: { type: String, required: true },
    allDay: { type: Boolean, required: true},
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    url: { type: String, required: true  },
    classNames: [String],
    editable: { type: Boolean, required: true  },
    startEditable: { type: Boolean, required: true  },
    durationEditable: { type: Boolean, required: true  },
    resourceEditable: { type: Boolean, required: false  },
    extendedProps: { type: Object, required: true }
  });

  const EventObject: Model<IEventObject> = models?.EventObject || model<IEventObject>('EventObject', eventObjectSchema);

  export { eventObjectSchema }