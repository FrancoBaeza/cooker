import { useState, useEffect } from 'react';

interface UseResourceProps {
    resource: any[];
    fetchResource: () => Promise<any>;
}

export default function useResource({resource, fetchResource}: UseResourceProps) {
  const [data, setData] = useState(resource);

  console.log('resource', data, !data)

  useEffect(() => {
    const getResource = async () => {
        console.log('fetching resource'	)
        const data = await fetchResource();
        setData(data);
    };
    if (data.length === 0) {
        getResource();
    } else {
        setData(resource);
    }
  }, [data]);

  return data;
}