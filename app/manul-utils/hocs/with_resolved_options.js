import _ from 'lodash';
import { composeWithTracker } from 'mantra-core';
import { extendWithOptions } from '/manul-utils/schema_utils';
/**
  withResolvedOptions is a composer that resolves all 'resolveOptions' in a
  array of schemas configurations, waits for the subscriptions to be ready and then
  maps the options to a property named 'resolvedSchemaOptions'. So the resolved options
  for a schema can be found in resolvedSchemaOptions[schemaName].prop

  e.g. withResolvedOptions(['companySchema']})
*/
export const composer = (schemas) => ({ context, ...props }, onData) => {
  const { SimpleSchema } = context();
  if (!schemas) {
    onData(null, { ...props });
  }

  const resolvedSchemaOptions = {};
  const extendedSchemas = {};
  schemas.forEach((schemaProp) => {
    const schema = props[schemaProp];

    if (schema) {
      resolvedSchemaOptions[schemaProp] = {};
      schema.objectKeys().forEach((field) => {
        const fieldDefinition = schema.getDefinition(field);
        if (fieldDefinition.resolveOptions) {
          resolvedSchemaOptions[schemaProp][field] = fieldDefinition.resolveOptions(context(), props);
        }
      });
    }
    if (_.every(resolvedSchemaOptions, o => _.every(o, s => s.sub.ready()))) {
      _.chain(resolvedSchemaOptions)
      .keys()
      .forEach(s => {
        const options = {};
        _.chain(resolvedSchemaOptions[s])
        .keys().
        forEach(f => {
          options[f] = resolvedSchemaOptions[s][f].data();
          resolvedSchemaOptions[s][f] = options[f];
        })
        .value();
        extendedSchemas[s] = extendWithOptions({ SimpleSchema }, props[s], options);
      })
      .value();
      onData(null, { ...props, ...extendedSchemas, resolvedSchemaOptions });
    }
  });
};

export default (schemas) => composeWithTracker(composer(schemas));
