
import _ from 'lodash';


export const mapOption = ({ _id, name }) => ({ value: _id, label: name });

export const mapOptionsWithChildren = (collection, parentId = null, map = mapOption) => {
  // TODO: mapOptionsWithChildren is not final, you currently can't customize the selector or the sorting

  return collection.find({ parentId }).map(doc => {
    return {
      ...map(doc),
      children: mapOptionsWithChildren(collection, doc._id, map),
    };
  });
};

export const extendWithOptions = ({ SimpleSchema }, schema, mapping) => {
  const newSchema = new SimpleSchema([
    schema, _.mapValues(mapping, (options, key) => {
      const def = schema.getDefinition(key);
      return {
        ...def,
        uniforms: { ...def.uniforms, options },
      };
    }),
  ]);
  // simple schema does not pass the custom messages. So we do this here:
  newSchema.messages(schema._messages);
  return newSchema;
}



export const extendSchemaOptions = ({ Match, SimpleSchema }) => SimpleSchema.extendOptions({
  resolveOptions: Match.Optional(Function),
});

export default ({ SimpleSchema, Match }) => {
  // TODO: move translateSchema here?
  console.warn('using schema_utils as service is deprecated, just import it');

  return {
    mapOptionsWithChildren,
    extendWithOptions: (...params) => extendWithOptions({ SimpleSchema }, ...params),
    mapOption,
    extendSchemaOptions: extendSchemaOptions({ SimpleSchema, Match }),
  };
};
